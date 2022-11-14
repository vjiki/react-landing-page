/* eslint-disable prettier/prettier */
declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';

declare module'*.scss' {
  const content: {[key: string]: any}
  export = content
}