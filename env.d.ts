/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORE_ID: string
  readonly VITE_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
