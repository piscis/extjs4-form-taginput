Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': 'extjs/src',
        'Ext.ux': 'extjs/examples/ux',
        'Iworx': 'app',
        'Iworx.form': 'app/Iworx/form'
    }
});

Ext.Loader.require([
    'Ext.app.Application',
    'Iworx.view.Viewport'
]);

Ext.onReady(function(){

    var app = Ext.application({
        name: 'Iworx Form TagInput example',
        requires: [
            'Iworx.view.Viewport'
        ],
        autoCreateViewport: false,
        models: [],
        stores: [],
        controllers: [],
        launch: function(){

            Ext.create('Iworx.view.Viewport');
            //console.log('launch');
        }
    });
});