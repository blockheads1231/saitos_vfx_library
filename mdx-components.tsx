import APIItem from "./components/Block"

export function useMDXComponents(components: Record<string, any>) {
  return {
    APIItem,
    ...components,
  }
}