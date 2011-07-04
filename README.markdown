SortPref
========

This is a Thunderbird add-on for utilizing a relatively new preference
that doesn't yet have a UI, one that affects the default column and
direction for sorting.

You should acquire it from [addons.mozilla.org][1].  Thanks to the hard
work and commitment of folks at [BabelZilla][2], the add-on is available
in a few localizations.

Development
-----------

This is a Make based project.  There are two main targets, one builds the
XPI appropriate for deployment (`all`), the other builds an XPI for
translation for upload to BabelZilla (`babelzilla`), which includes strings
that are used in the `install.rdf` and addons.mozilla.org and consequently
sit outside the normal flow of translation.

Mechanism
---------

This patches one method normally found
in `chrome://messenger/content/threadPane.js` to use the sort direction
preference instead of the global sort default.

If anybody can help me get this committed to the actual Thunderbird code
base so the add-on is no longer necessary, please let me know.

[1]: https://addons.mozilla.org/thunderbird/addon/sortpref/
[2]: http://www.babelzilla.org/
