Ext.define('Iworx.view.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'iworx.main',
    requires: [
        'Ext.panel.Panel',
        'Ext.form.*',
        'Iworx.form.TagInput'
    ],
    initComponent: function(){

        var me = this;

        Ext.apply(me,{
            layout: 'border',
            fit:1,
            region: 'center',
            items: [me._createFormPanel()]
        });

        this.callParent(arguments);
    },

    _createFormPanel: function(){

        var formPanel = Ext.create('Ext.form.Panel',{
            title:'Test1',
            items: [
                Ext.create('Iworx.form.TagInput')
            ]
        });

        this.formPanel = formPanel;

        return this.formPanel;
    }
});