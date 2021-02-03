import { objectType } from 'nexus'

export const Speek = objectType({
  name: 'Speek',
  definition(t) {
    t.model.id()
    t.model.content()
    t.model.title()
    t.model.excerpt()
    t.model.author()
    t.model.createdAt()
    t.model.likes()
  },
})
