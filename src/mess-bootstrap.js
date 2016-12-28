/**
 * Created by irelance on 2016/12/23.
 */
var MessBootstrap = {};
MessBootstrap.required = {$: {name: 'jQuery'}};
(function () {
    for (var i in MessBootstrap.required) {
        if (eval('typeof ' + i + '=="undefined"')) {
            return console.log('Module:[' + MessBootstrap.required[i].name + '] undefined!');
        }
    }
    MessBootstrap.Table = function (options) {
        this.template = new function () {
            this.th = function (options) {
                return $('<th class="visible-' + options.visible + ' hidden-' + options.hidden + '" width="' + options.width + '">' + options.label + '</th>');
            };
            this.td = function (options, value) {
                return $('<td class="visible-' + options.visible + ' hidden-' + options.hidden + '" width="' + options.width + '"></td>')
                    .append(options.handle(value));
            };
            this.tr = function (values) {
                var tr = $('<tr></tr>');
                for (var i in options.header) {
                    var td = $('<td></td>');
                    if (values[i]) {
                        td = this.td(options.header[i], values[i]);
                    }
                    tr.append(td);
                }
                for (i in options.extra) {
                    tr.append(this.td(options.extra[i], values));
                }
                return tr;
            };
        };
        this.init = function (element, items) {
            var table = $('<table class="table"></table>');
            var thead = $('<tr></tr>');
            for (var i in options.header) {
                //merge header options
                options.header[i] = $.extend(true, {
                    label: '',
                    visible: undefined,
                    hidden: undefined,
                    width: undefined,
                    handle: function (value) {
                        return value;
                    }
                }, options.header[i]);
                thead.append(this.template.th(options.header[i]));
            }
            for (i in options.extra) {
                //merge extra options
                options.extra[i] = $.extend(true, {
                    label: '',
                    visible: undefined,
                    hidden: undefined,
                    width: undefined,
                    handle: function (values) {
                        return '';
                    }
                }, options.extra[i]);
                thead.append(this.template.th(options.extra[i]));
            }
            var tbody = $('<tbody></tbody>');
            if (items) {
                for (i in items) {
                    tbody.append(this.template.tr(items[i]));
                }
            }
            table.append(thead).append(tbody);
            element.html(table);
        };
        this.append = function (element, values) {
            if (options.append == 'top') {
                element.find('tbody').prepend(this.template.tr(values));
            } else {
                element.find('tbody').append(this.template.tr(values));
            }
        };
    };
    MessBootstrap.Button = function (options) {
        this.template = function (label, type) {
            return $('<button type="button" class="btn btn-' + type + '">' + label + '</button>');
        }
    }
})();

