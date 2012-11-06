Ext.define('Iworx.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    requires: [
        'Iworx.view.Main'
    ],
    
    initComponent: function() {

        var me = this;

        Ext.apply(this, {
            layout: {
                type: 'border',
                padding: 0
            },
            items: [ Ext.create('Iworx.view.Main',{})]
        });

        this.callParent(arguments);
    }
});