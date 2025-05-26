<template>
  <button 
    @click="$emit('click')" 
    :class="[
      'tracking-widest px-10 py-4 text-xs uppercase font-medium relative transition-all ease-in-out duration-300',
      variantStyle === 'solid' && variant === 'primary' ? 'bg-primary text-white hover:bg-white hover:text-secondary hover:shadow-xl' : '',
      variantStyle === 'solid' && variant === 'secondary' ? 'bg-secondary text-white hover:bg-white hover:text-secondary hover:shadow-xl' : '',
      variantStyle === 'light' && variant === 'primary' ? 'bg-transparent border border-primary text-primary hover:bg-primary hover:bg-opacity-10' : '',
      variantStyle === 'light' && variant === 'secondary' ? 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:bg-opacity-10' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  props: {
    text: { 
      type: String,
      default: 'Text' 
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value)
    },
    variantStyle: {
      type: String,
      default: 'solid',
      validator: (value) => ['solid', 'light'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
};
</script>