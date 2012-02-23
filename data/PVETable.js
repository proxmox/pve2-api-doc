// just a test - not usable now

Ext.define('PVE.Table', {
    extend: 'Ext.Component',

    alias: 'widget.pvetable',

    onRender: function() {
        var me = this;

	Ext.applyIf(me.renderData, {
	    id: me.getId(),
	    title: me.title,
	    columns: me.columns
	});

	var rows = [];
	me.store.each(function(record) {
	    rows.push(record.data);
	});

	me.renderData.rows = rows;
	me.callParent(arguments);
    },

    metaRowTpl: '<tr>' +
	'<tpl for="columns">' +
	'<td>{{dataIndex}}</td>' +
	'</tpl>'+ 
	'</tr>',

    metaRenderTpl: '<h1>{title}</h1>' +
	'<table border="1" cellspacing="0" cellpadding="0">' +
	'<tr><tpl for="columns">' +
	'<th><div id="{parent.id}-th-resize{#}" style="background-color:red;">{header}</div></th>' +
	'</tpl></tr>'+ 
        '{[this.openRows()]}' +
	'{row}'+ 
        '{[this.closeRows()]}' +
	'</table>',
   
    initComponent : function() {
        var me = this;

	Ext.Array.each(me.columns, function(col, i) {
	    if (!col.width)
		col.width = 100;
	    if (!col.minWidth || (col.minWidth < 10))
		col.minWidth = 10;
	    if (col.width < col.minWidth)
		col.width = col.minWidth;
	});

	var metaRowTpl = Ext.create('Ext.XTemplate', me.metaRowTpl);
        me.row = metaRowTpl.applyTemplate(me);

	var metaTpl = Ext.create('Ext.XTemplate', me.metaRenderTpl, {
	    openRows: function() {
		return '<tpl for="rows">';
	    },

	    closeRows: function() {
		return '</tpl>';
	    }
	});
 	var tpl = metaTpl.applyTemplate(me);

	//console.log("TEST1 " + tpl);

	Ext.apply(me, {
	    renderTpl: tpl
	});

 	me.callParent();

	// only works with FF
	me.on('afterrender', function() {
	    Ext.Array.each(me.columns, function(col, i) {
		var myid = me.getId() + '-th-resize' + (i+1);
		var rz = Ext.create('Ext.resizer.Resizer', {
		    el: myid,
		    handles: 'e',
		    minWidth: col.minWidth,
		    transparent: true,
		    listeners: {
			resize: function(t, width, height) {
			    var target = t.getTarget();
			    var parent = target.parent();
			    parent.setWidth(width);
			    t.el.setWidth(parent.getWidth()-1);
			}
		    }
		});
		rz.resizeTo(col.width);
	    });
	});
    }
});
