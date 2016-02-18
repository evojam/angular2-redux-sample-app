System.config({
    map: {
        redux: 'node_modules/redux/dist/redux.js',
        monet: 'node_modules/monet/src/main/javascript/monet.js'
    },
    packages: {
        'dist/app': {format: 'register', defaultExtension: 'js'},
        'dist/todo-lib': {format: 'register', defaultExtension: 'js'}
    }
});
