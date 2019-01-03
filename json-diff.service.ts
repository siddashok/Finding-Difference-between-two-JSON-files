

export class FindJsonDiff {


    
    findiff(object1: any, object2: any) {
        var object1html = "";
        var object2html = ""

///////////////

        for (const [key, value] of Object.entries(object1)) {
            var value1 = object1[key]
            var value2 = object2[key]
            if (!value1 && !value2) {
                object1html += this.getFormattedValue(key, value1, DivType.Same)
                object2html += this.getFormattedValue(key, value2, DivType.Same)
                continue
            }
            const [object1htmlreturn, object2htmlreturn] = this.processObjectValues(key, value1, value2)

            object1html += object1htmlreturn;
            object2html += object2htmlreturn

        }
//////////////////

        for (const [key, value] of Object.entries(object2)) {
            var value1 = object1[key]
            var value2 = object2[key]
            if (!value1 && !value2) {
                object1html += this.getFormattedValue(key, value1, DivType.Same)
                object2html += this.getFormattedValue(key, value2, DivType.Same)
                continue
            }
            if (value1 == undefined) {
                const [object1htmlreturn, object2htmlreturn] = this.processOneUndefined(key, value1, value2);
                object1html += object1htmlreturn;
                object2html += object2htmlreturn
            }

        }
        return [object1html, object2html]
    }









    processArray(key, value1, value2) {
        var object1html = ""
        var object2html = ""
        value1.forEach((value, k) => {
            const [object1htmlreturn, object2htmlreturn] = this.processArrayValues(value, value2[k] ? value2[k] : [])
            object1html += object1htmlreturn
            object2html += object2htmlreturn
        })
        if (value2.length > value1.length) {
            for (var k = value1.length; k < value2.length; k++) {
                const [object1htmlreturn, object2htmlreturn] = this.processArrayValues([], value2[k])
                object1html += object1htmlreturn
                object2html += object2htmlreturn
            }
        }

        return [object1html, object2html]

    }
    getFormattedValue(key, value, type: DivType) {
        switch (type) {
            case DivType.ArrayValueDiff:

                return "<div class='diff'>" + this.format(value) + ",</div>";
            case DivType.ArrayValue:

                return "<div class='same'>" + this.format(value) + ",</div>";
            case DivType.Diff:
                if (key != "") {
                    key += ":"

                } else {
                    key = "&nbsp;"
                }
                return "<div class='diff'>" + key + this.format(value) + ",</div>";
            case DivType.Same:
                if (key != "") {
                    key += ":"

                } else {
                    key = "&nbsp;"
                }
                return "<div class='same'>" + key + this.format(value) + ",</div>";
            case DivType.Object:
                var keyend = "&nbsp;"
                if (key != "") {
                    key += ":{"
                    keyend = "}"
                } else {
                    key = "&nbsp;"
                }
                if (value.substring(value.length - 7) == ",</div>")
                    value = value.substring(0, value.length - 7) + "</div>"
                return "<div class='same'>" + key + "</div> <div class='same'>" + value + "</div><div class='same'>" + keyend + "</div>";

            case DivType.ObjectDiff:
                var keyend = "&nbsp;"
                if (key != "") {
                    key += ":{"
                    keyend = "}"
                } else {
                    key = "&nbsp;"
                }
                if (value.substring(value.length - 7) == ",</div>")
                    value = value.substring(0, value.length - 7) + "</div>"
                return "<div class='diff'>" + key + "</div> <div class='diff'>" + value + "</div><div class='diff'>" + keyend + "</div>";
            case DivType.ArrayObject:
                var keyend = "&nbsp;"
                if (value != "") {
                    key += "{"
                    keyend = "}"
                } else {
                    key = "&nbsp;"
                }
                if (value.substring(value.length - 7) == ",</div>")
                    value = value.substring(0, value.length - 7) + "</div>"
                return "<div class='same'>" + key + "</div> <div class='same'>" + value + "</div><div class='same'>" + keyend + ",</div>";

            case DivType.ArrayObjectDiff:
                var keyend = "&nbsp;"
                if (value != "") {
                    key += "{"
                    keyend = "}"
                } else {
                    key = "&nbsp;"
                }
                if (value.substring(value.length - 7) == ",</div>")
                    value = value.substring(0, value.length - 7) + "</div>"
                return "<div class='diff'>" + key + "</div> <div class='diff'>" + value + "</div><div class='diff'>" + keyend + ",</div>";

            case DivType.ArrayDiff:
                return "<div class='diff'>[</div><div class='diff'>" + value + "</div><div class='diff'>]</div>";
            case DivType.Array:
                return "<div class=same>" + key + ":</div><div class='same'>[</div><div class='same'>" + value + "</div><div class='same'>]</div>";
        }

    }
    format(value) {
        if (typeof value == 'string') {
            return "\"" + value + "\""
        }
        else
            return value;
    }
    processOneUndefined(key, value1, value2) {
        if (value1 == undefined) {
            if (typeof value2 === 'object') {
                const [object1htmlreturn, object2htmlreturn] = this.findiff({}, value2);
                return [this.getFormattedValue("", object1htmlreturn, DivType.ObjectDiff),
                this.getFormattedValue(key, object2htmlreturn, DivType.ObjectDiff)];
            } else {
                return [this.getFormattedValue("", "", DivType.Diff),
                this.getFormattedValue(key, value2, DivType.Diff)];
            }
        } else if (value2 == undefined) {
            if (typeof value1 === 'object') {
                const [object1htmlreturn, object2htmlreturn] = this.findiff(value1, {});
                return [this.getFormattedValue(key, object1htmlreturn, DivType.ObjectDiff),
                this.getFormattedValue("", object2htmlreturn, DivType.ObjectDiff)];
            } else {
                return [this.getFormattedValue(key, value1, DivType.Diff),
                this.getFormattedValue("", "", DivType.Diff)];
            }
        }
    }
    processObjectValues(key, value1, value2) {
        if (value2 != undefined) {
            if (typeof value2 === typeof value1 && typeof value1 !== 'object') {
                if (value1 != value2) {

                    return [this.getFormattedValue(key, value1, DivType.Diff), this.getFormattedValue(key, value2, DivType.Diff)]
                }
            } else if (typeof value2 === typeof value1 && typeof value1 === 'object' && !Array.isArray(value1)) {
                const [object1htmlreturn, object2htmlreturn] = this.findiff(value1, value2);

                return [this.getFormattedValue(key, object1htmlreturn, DivType.Object), this.getFormattedValue(key, object2htmlreturn, DivType.Object)]

            } else if (typeof value2 === typeof value1 && Array.isArray(value1)) {

                const [object1htmlreturn, object2htmlreturn] = this.processArray(key, value1, value2)
                return [this.getFormattedValue(key, object1htmlreturn, DivType.Array), this.getFormattedValue(key, object2htmlreturn, DivType.Array)]
            } else if (typeof value2 !== typeof value1 && value1 != undefined && value2 != undefined) {

                const [object1htmlreturn, object2htmlreturn] = this.processObjectValues(key, value1, undefined)
                const [object1htmlreturn1, object2htmlreturn1] = this.processOneUndefined(key, undefined, value2)
                return [object1htmlreturn + object1htmlreturn1, object2htmlreturn + object2htmlreturn1]
            }
        }
        else {
            return this.processOneUndefined(key, value1, value2)

        }
        return [this.getFormattedValue(key, value1, DivType.Same), this.getFormattedValue(key, value2, DivType.Same)];
    }

    processArrayValues(value1, value2) {
        if (value2 != undefined) {
            if (typeof value2 === typeof value1 && typeof value1 !== 'object') {
                if (value1 != value2) {

                    return [this.getFormattedValue("", value1, DivType.Diff), this.getFormattedValue("", value2, DivType.ArrayValueDiff)]
                }
            } else if (typeof value2 === typeof value1 && typeof value1 === 'object') {
                const [object1htmlreturn, object2htmlreturn] = this.findiff(value1, value2);

                return [this.getFormattedValue("", object1htmlreturn, DivType.ArrayObject), this.getFormattedValue("", object2htmlreturn, DivType.ArrayObject)]

            } else if (typeof value2 === typeof value1 && Array.isArray(value1)) {
                return this.processArray(undefined, value1, value2)
            }
        }
        else {
            if (typeof value1 === 'object') {
                const [object1htmlreturn, object2htmlreturn] = this.findiff(value1, {});
                return [this.getFormattedValue("", object1htmlreturn, DivType.ArrayObjectDiff),
                this.getFormattedValue("", object2htmlreturn, DivType.ArrayObjectDiff)];
            } else {
                return [this.getFormattedValue("", value1, DivType.ArrayValueDiff),
                this.getFormattedValue("", "", DivType.ArrayValueDiff)];
            }

        }
        return [this.getFormattedValue("", value1, DivType.ArrayValue), this.getFormattedValue("", value2, DivType.ArrayValue)];
    }
}











class RenderedObject {
    object1: string;
    object2: string;
}

enum DivType {
    Empty,
    Same,
    Diff,
    Object,
    ObjectDiff,
    Array,
    ArrayDiff,
    ArrayObject,
    ArrayObjectDiff,
    ArrayValue,
    ArrayValueDiff,
}