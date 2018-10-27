const fetchConfig = async () => {
  const response = await fetch(`${window.location.origin}/config`)
  return await response.json()
}

const initFirebaseApp = async () => {
  const { firebase: { webApiKey, projectId } } = await fetchConfig()

  const config = {
    apiKey: webApiKey,
    authDomain: `${projectId}.firebaseapp.com`,
  }

  return firebase.initializeApp(config)
}

window.addEventListener('load', async () => {
  const logoutButton = document.getElementById('btn-logout')
  const loginStatus = document.getElementById('login-status')

  const app = await initFirebaseApp()

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(app.auth())

  // Source: https://github.com/firebase/firebaseui-web
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('sign in success with auth result', authResult, redirectUrl)
        return false
      }
    },
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: () => {
    },
    // Privacy policy url/callback.
    privacyPolicyUrl: () => {
    }
  };

  firebase.auth().onAuthStateChanged(user => {
    console.log('auth state changed', user)
    if (user) {
      logoutButton.style.display = 'inline-block'
      loginStatus.innerHTML = `You are logged in by ${user.providerId} and your user id is: ${user.uid}`
    } else {
      logoutButton.style.display = 'none'
      loginStatus.innerHTML = 'You are not logged in! Please log in to continue.'
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  })

  logoutButton.addEventListener('click', () => {
    firebase.auth().signOut()
  })
})
