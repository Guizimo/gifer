/**
 * 安全限制工具
 * 用于禁用右键点击、文本选择等功能
 */

export function applySecurityRestrictions() {
  // 禁用右键点击
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 禁用文本选择
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });
}

export function removeSecurityRestrictions() {
  // 如果需要在某些情况下移除这些限制，可以使用此函数
  document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
  document.removeEventListener('selectstart', handleSelectStart, { capture: true });
}

// 辅助函数，用于移除事件监听器
function handleContextMenu(e: Event) {
  e.preventDefault();
  return false;
}

function handleSelectStart(e: Event) {
  e.preventDefault();
  return false;
}