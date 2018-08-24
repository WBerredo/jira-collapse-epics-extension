const JIRA_PATTERN = 'body#jira';

function collapseCompletedEpics() {
  document.querySelectorAll(`${JIRA_PATTERN} .ghx-swimlane:not(.ghx-closed)`).forEach((epicContainer) => {
    const epicItems = epicContainer.querySelectorAll('li');
    const epicItemsCount = epicItems.length;
    let valid = false;
    epicItems.forEach((item, index) => {
      if (index !== epicItemsCount - 1 && item.innerHTML) valid = true;
    });

    if (!valid) {
      const expandedIcon = epicContainer.querySelector('.aui-iconfont-expanded');
      if (expandedIcon) {
        expandedIcon.click();
      }
    }
  });
}

function uncollapseAll() {
  document.querySelectorAll(`${JIRA_PATTERN} .ghx-swimlane.ghx-closed`).forEach((epicContainer) => {
    const expandedIcon = epicContainer.querySelector('.aui-iconfont-expanded');
    if (expandedIcon) {
      expandedIcon.click();
    }
  });
}

function clickOption() {
  const collapseOptionElement = document.getElementById('collapse-completed');
  if (collapseOptionElement.classList.contains('ghx-active')) {
    collapseOptionElement.classList.remove('ghx-active');
    uncollapseAll();
  } else {
    collapseOptionElement.classList.add('ghx-active');
    collapseCompletedEpics();
  }
}

function collapseOption() {
  const dd = document.createElement('dd');
  const a = document.createElement('a');
  a.addEventListener('click', clickOption);
  a.innerHTML = 'Collapse Completed Epics';
  a.id = 'collapse-completed';

  dd.appendChild(a);

  return dd;
}

const quickFilters = document.querySelector(`${JIRA_PATTERN} .js-quickfilter-selector > div`);

if (quickFilters) {
  quickFilters.appendChild(collapseOption());
}
