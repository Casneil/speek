import { objectType } from 'nexus'

export const Speek = objectType({
  name: 'Speek',
  definition(t) {
    t.model.id()
    t.model.content()
    t.model.author()
  },
})
