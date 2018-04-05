// this puts our cookie configurations in one place so they'll be easier to modify/maintain
export function setUserCookie(cookies, userCredentials) {
    // set a cookie upon login with firebase_id
    cookies.set('firebase_id', userCredentials.user.uid, {path: '/', maxAge: 1000000});
    if (userCredentials.credential) {
        cookies.set('facebook_token', userCredentials.credential.accessToken, {path: '/', maxAge: 1000000});
    }
}
