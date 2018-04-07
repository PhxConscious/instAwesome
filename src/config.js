// Here is additional information on how this works within the build process:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

const configs = {
    production: {
        firebase: {
            apiKey: 'AIzaSyBFEdZg8MAuR418IROwh-ypm6D-imqTAGI',
            authDomain: 'instawesome-263a4.firebaseapp.com',
            databaseURL: 'https://instawesome-263a4.firebaseio.com',
            projectId: 'instawesome-263a4',
            storageBucket: 'instawesome-263a4.appspot.com',
            messagingSenderId: '349229241615',
        },
        app: {
            ui: 'https://app.phxconscious.com',
            api: 'https://desolate-scrubland-48971.herokuapp.com/',
        },
    },

    development: {
        firebase: {
            apiKey: 'AIzaSyBFEdZg8MAuR418IROwh-ypm6D-imqTAGI',
            authDomain: 'instawesome-263a4.firebaseapp.com',
            databaseURL: 'https://instawesome-263a4.firebaseio.com',
            projectId: 'instawesome-263a4',
            storageBucket: 'instawesome-263a4.appspot.com',
            messagingSenderId: '349229241615',
        },
        app: {
            ui: 'http://localhost:3000',
            api: 'http://localhost:8080',
        },
    },
};

export default configs[process.env.NODE_ENV]
