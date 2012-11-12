Ext.define('Ext.ux.iworx.form.TagInput', {

    requires: [
        'Ext.data.ArrayStore'
    ],

    extend: 'Ext.form.Text',
    alias: 'iworx.taginput',

    valueField: 'value',
    tagDelimiter: ',',
    allowSpaces: false,

    xtype: 'taginput',

    fieldCls: "x-form-taginput",
    typeCls: "x-form-taginput",
    editableCls: "x-form-taginput",
    width: "100%",

    fieldSubTpl: [
        '<ul class="tag-widget"> ',
        '   <li class="tag-item-input">',
        '       <input type="text" class="tag-input" id="{id}" value="" />',
        '   </li>',
        '</ul>',
        {
            disableFormats: true
        }
    ],

    tagNodeTpl: [
        '<li style="" class="tag-item tag-choice">',
        '    <span class="tag-label">{tagvalue}</span>',
        '    <a class="tag-close">',
        '         <span class="tag-icon">x</span>',
        '    </a>',
        '</li>'
    ],

    initComponent: function(){

        var me = this;

        this.store = this.store || Ext.create('Ext.data.ArrayStore', {
            autoDestroy: true,
            data: [],
            idIndex: 0,
            fields: [ 
                {name: 'id', type: 'float'},
                {name: 'value', type: 'string'}
            ]
        });

        this.store.on('datachanged',function(){

            me._syncWithStore();
        });

        this.callParent();
    },

    getSubTplData: function(){

        var me = this,
            data = me.callParent();
        
        return Ext.apply(data, {});  
    },

    getTagFieldEl: function(){

        return Ext.select('#'+this.getId()+' ul.tag-widget').item(0);
    },
    
    getRawValue: function(){

        var valueList = [],
            me = this;

        me.store.getRange();
        
        Ext.each(me.store.getRange(), function (item, idx, a){

            valueList.push(item.get(me.valueField));
        });
        
        return valueList.join(this.tagDelimiter);
    },

    setRawValue: function(value){

        var me = this,
            data = value.split(this.tagDelimiter);

        Ext.each(data, function(value){

            me._createTagValueItem(value);
        });
    },

    listeners: {

        afterrender: function(){

            this._populateList();
            this._registerHandler();
            this._registerTagFieldHandler();
        }
    },

    _populateList: function(){

        var me = this;

        Ext.each(me.store.getRange(), function (item, idx, a){
           
            var value = item.get('value');
            me._createTagValueItem(value);

        });
    },

    _registerHandler: function(){

        var me = this;

        this.inputEl.on({

            keydown: function(e, target, options) {

                // Delete the last item
                if(e.getKey()==8){

                    var lastTagItem = Ext.select('#'+me.getId()+' .tag-item:last');

                    if(lastTagItem.elements.length>0) {
    
                        var textNode = Ext.select('#'+me.getId()+' .tag-item:last .tag-label');
                        var tagVal = textNode.item(0).dom.innerHTML;
                        var tmpTagVal = Ext.String.htmlDecode(tagVal);

                        me._removeTagValue(tmpTagVal);
                        lastTagItem.remove();
                    }

                }else{

                    var keyCode = e.getKey(),
                        el = me.inputEl,
                        keyCodeList = [
                        13, // Return
                        9,  // TAB
                        27  // ESC
                    ];

                    if(me.allowSpaces==false){
                        keyCodeList.push(32);  // SPACE
                    }

                    Ext.each(keyCodeList,function(value){

                        if(value==keyCode){
                            e.preventDefault();
                            e.stopPropagation();

                            me._createTagValueItem(el.getValue());
                            el.dom.value = '';
                            return false;
                        }
                    });
                }

            },

            keyup: function(e, target, options){

                var keyCode = e.getKey(),
                    el = me.inputEl,
                    value = el.getValue();

                if((value.charAt(value.length-1))==me.tagDelimiter){

                    e.preventDefault();
                    e.stopPropagation();

                    var finalValue = value.substr(0,(value.length-1));
                    me._createTagValueItem(finalValue);
                    el.dom.value = '';
                }
            }
        });
    },

    _registerTagFieldHandler: function(){
        
        var me = this;

        me.getTagFieldEl().on({

            click: function(e, target, options){
                me.inputEl.focus();
            }
        });

        me.getTagFieldEl().on('click', function(e, target, options){

            var parent = null,
                opts = {
                    callback: function(e,target,foo){
                    
                        var parent = Ext.get(e.target.id),
                            tagValue = parent.down('span.tag-label').dom.innerHTML,
                            tmpTagVal = Ext.String.htmlDecode(tagValue);
                        
                        me._removeTagValue(tmpTagVal);
                        parent.remove();
                }
            };

            parent = Ext.get(target).up('li.tag-item').fadeOut(opts);

        },null,{
            delegate: 'a.tag-close'
        });
    },

    _createTagValueItem: function(tagval){

        var tagval = Ext.util.Format.trim(tagval);

        if(tagval!=''){

            if(this._findSelectedElement(tagval).elements.length==0){

                var id = this.getId(),
                    target = Ext.select('#'+id+' .tag-item-input').first(),
                    html = this.tagNodeTpl,
                    tpl = Ext.core.DomHelper.createTemplate(html),
                    tmpTagVal = Ext.String.htmlEncode(tagval);

                tpl.insertBefore(target,{tagvalue:tmpTagVal});

                this._addTagValue(tagval);

            }else{

                this._highlightByTagValue(tagval);
            }
        }
    },

    _syncWithStore: function(){
        var me = this;

        Ext.select('#'+me.getId()+' .tag-item').remove();
        me._populateList();
    },

    _addTagValue: function(tagval){

        var tagval = Ext.util.Format.trim(tagval);

        if(!this._tagExists(tagval)){

            var record = this.store.model.create();
            record.set(this.valueField,tagval);
            this.store.add(record);
        }
    },

    _removeTagValue: function(tagval){

        var me = this;

        if(this._tagExists(tagval)){

            var index = this.store.find(this.valueField,tagval);
            this.store.removeAt(index);
        }
    },

    _tagExists: function(tagval){

        var index = this.store.find(this.valueField,tagval);

        if(index>-1){
            return true;
        }else{
            return false;
        }
    },

    _highlightByTagValue: function(tagval){

        var tagval = Ext.util.Format.trim(tagval),
            elements = this._findSelectedElement(tagval);

        elements.each(function(item){ Ext.get(item).up('li').highlight(); });
    },

    _findSelectedElement: function(tagval){

        var tagval = Ext.util.Format.trim(tagval),
            id = this.getId();

        return Ext.select('#'+id+' li.tag-item span.tag-label:nodeValue('+tagval+')');
    }
});