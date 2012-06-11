var nsMsgViewFlagsType = Components.interfaces.nsMsgViewFlagsType;

/** @namespace */
var SortPrefOptions = {
    /** @constant */
    "viewFlagsElements": {
        "viewFlagsThread": [nsMsgViewFlagsType.kThreadedDisplay, nsMsgViewFlagsType.kGroupBySort],
        "viewFlagsUnread": [nsMsgViewFlagsType.kUnreadOnly],
        "viewFlagsExpand": [nsMsgViewFlagsType.kExpandAll]
    }
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsCurrent = function() {
    var preference = document.getElementById("viewFlags");
    return (typeof preference.value === "undefined") ?
            preference.defaultValue :
            preference.value;
};

/**
 * Read from all associated elements in order to set preference value.
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsCalculateTo = function() {
    var el, flags, id, i, all = nsMsgViewFlagsType.kNone;
    for (id in SortPrefOptions.viewFlagsElements) {
        el = document.getElementById(id);
        if (el.nodeName.toLowerCase() === "checkbox") {
            if (el.checked) {
                flags = SortPrefOptions.viewFlagsElements[id];
                for (i = 0; i < flags.length; i++) {
                    all = all | flags[i];
                }
            }
        } else {
            all = all | el.value;
        }
    }
    SortPrefOptions.sideEffects(all);
    return all;
};

/**
 * Set up the display of this preference across its associated elements.
 * NB, threaded display gets priority over grouped in the odd, rare case
 * where both flags are set in the already modified preferences.  They
 * are meaningless in combination.  Using this extension will correct any
 * inconsistencies if the settings are ever subsequently changed.
 * @param {String} id
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsCalculateFrom = function(id) {
    var preference, flags, i;
    preference = SortPrefOptions.viewFlagsCurrent();
    SortPrefOptions.sideEffects(preference);
    flags = SortPrefOptions.viewFlagsElements[id];
    for (i = 0; i < flags.length; i++) {
        if (preference & flags[i]) {
            return flags[i];
        }
    }
    return nsMsgViewFlagsType.kNone;
};

/**
 * There could be a preference observer to do this... but it's not
 * really worth the extra effort right now.  Boys and girls, side effects
 * are Real Bad.  Don't do this.
 * @param {Numeric} flags
 */
SortPrefOptions.sideEffects = function(flags) {
    document.getElementById("viewFlagsExpand").disabled = !(flags & nsMsgViewFlagsType.kThreadedDisplay);
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsThreadTo = function() {
    return SortPrefOptions.viewFlagsCalculateTo();
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsThreadFrom = function() {
    return SortPrefOptions.viewFlagsCalculateFrom("viewFlagsThread");
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsUnreadTo = function() {
    return SortPrefOptions.viewFlagsCalculateTo();
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsUnreadFrom = function() {
    return SortPrefOptions.viewFlagsCalculateFrom("viewFlagsUnread");
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsExpandTo = function() {
    return SortPrefOptions.viewFlagsCalculateTo();
};

/**
 * @returns {Numeric}
 */
SortPrefOptions.viewFlagsExpandFrom = function() {
    return SortPrefOptions.viewFlagsCalculateFrom("viewFlagsExpand");
};
