// cribbed from mail/base/content/threadPane.js
function MsgSortThreadPane(sortName)
{
  let sortType = nsMsgViewSortType[sortName];
  let grouped = gFolderDisplay.view.showGroupedBySort;
  gFolderDisplay.view._threadExpandAll =
    Boolean(gFolderDisplay.view._viewFlags & nsMsgViewFlagsType.kExpandAll);

  if (!grouped) {
    gFolderDisplay.view.sort(sortType, gFolderDisplay.view.primarySortOrder)
    // Respect user's last expandAll/collapseAll choice, post sort direction change.
    gFolderDisplay.restoreThreadState();
    return;
  }

  // legacy behavior dictates we un-group-by-sort if we were.  this probably
  //  deserves a UX call...

  // For non virtual folders, do not ungroup (which sorts by the going away
  // sort) and then sort, as it's a double sort.
  // For virtual folders, which are rebuilt in the backend in a grouped
  // change, create a new view upfront rather than applying viewFlags. There
  // are oddities just applying viewFlags, for example changing out of a
  // custom column grouped xfvf view with the threads collapsed works (doesn't)
  // differently than other variations.
  // So, first set the desired sortType and sortOrder, then set viewFlags in
  // batch mode, then apply it all (open a new view) with endViewUpdate().
  gFolderDisplay.view.beginViewUpdate();
  gFolderDisplay.view._sort = [[sortType, nsMsgViewSortOrder.ascending]];
  gFolderDisplay.view.showGroupedBySort = false;
  gFolderDisplay.view.endViewUpdate();

  // Virtual folders don't persist viewFlags well in the back end,
  // due to a virtual folder being either 'real' or synthetic, so make
  // sure it's done here.
  if (gFolderDisplay.view.isVirtual)
      gFolderDisplay.view.dbView.viewFlags = gFolderDisplay.view.viewFlags;
}
