Ext.define('Iworx.form.TagInput', {
    extend: 'Ext.form.Picker',
    alias: 'iworx.taginput',


    foobar: 'asdf123',

    fieldSubTpl: [ // note: {id} here is really {inputId}, but {cmpId} is available
        '<input id="{id}" type="{type}" {inputAttrTpl}',
            ' size="1"', // allows inputs to fully respect CSS widths across all browsers
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
        ' class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"/>',
        {
            disableFormats: true,
        }
    ],


    initComponent: function(){

        this.callParent();
        this.foobar = '123';
    },

    getSubTplData: function(){
        var me = this,
            data = me.callParent();
        
        return Ext.apply(data, {foobar: me.foobar});  
    }
});