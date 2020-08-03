export const isEmpty = obj => Object.keys(obj).length === 0;

export const startCase = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getCondition = (binding) => {
  let suffix = binding.name === 'can' ? 'permission' : binding.name;
  let arg = 'has';

  if (binding.arg) {
    if (binding.arg === 'unless') {
      arg = 'unless';
    } else if (binding.arg !== 'has') {
      arg += startCase(binding.arg);
    }
  }

  // Convert to plural if is needed
  if (arg === 'hasAll') {
    suffix += 's';
  }

  return `${arg}${startCase(suffix)}`;
};

export const isConditionPassed = Vue => (el, binding) => {
  if (!binding.value) {
    console.error('You must specify a value in the directive.');
    return;
  }

  // Get condition to validate
  const condition = getCondition(binding);

  if (!Vue.prototype.$gate[condition](binding.value)) {
    if (isEmpty(binding.modifiers)) {
      // Remove DOM Element
      el.parentNode.removeChild(el);
    } else {
      // Set attributes to DOM element
      Object.assign(el, binding.modifiers);
    }
  }
};
