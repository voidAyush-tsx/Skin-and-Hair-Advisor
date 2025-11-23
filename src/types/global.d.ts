/// <reference types="vite/client" />

declare module '@/components/ui/*' {
  import { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
}

declare module '@/components/*' {
  import { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
}

declare module '@/lib/*' {
  const module: any;
  export default module;
}
