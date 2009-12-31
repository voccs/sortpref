function MsgSortThreadPane(sortName)
{
  var sortType = nsMsgViewSortType[sortName];
  gFolderDisplay.view.showGroupedBySort = false;
  gFolderDisplay.view.sort(sortType, gFolderDisplay.view.primarySortOrder)
}
