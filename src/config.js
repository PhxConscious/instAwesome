// I like to put all my environment variables in one place so I don't have
// to look around the app for other places they might be used.  This way any
// time 'config' is referenced you will know where it's coming from.
//
// Here is additional information on how this works within the build process:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
//
// -BM

export default {
    firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    },
    app: {
        domain: process.env.REACT_APP_DOMAIN,
        api: process.env.REACT_APP_API,
    }
};
