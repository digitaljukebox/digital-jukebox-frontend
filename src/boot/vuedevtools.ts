import devtools from '@vue/devtools'

export default async (/* { app, router, Vue ... } */) => {
  if (process.env.NODE_ENV === 'development') {
    devtools.connect('http://localhost', 8098)
  }
}
