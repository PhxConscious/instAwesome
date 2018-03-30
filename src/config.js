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
            ui: 'https://apps.phxconscious.com',
            api: 'https://api.phxconscious.com',
        },
        fb: {
            app_id: '2240304176196440',
            redirect_uri: 'https://api.phxconscious.com/fb_graph/receive_code',
        }
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
        fb: {
            app_id: '2240304176196440',
            redirect_uri: 'http://lvh.me:8080/fb_graph/receive_code' // lvh.me is a DNS record for 127.0.0.1
        }
    },
};

export default configs[process.env.NODE_ENV]
