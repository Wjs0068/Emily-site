import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required to run Sanity Studio.');
}

export default defineConfig({
  name: 'default',
  title: "Em's Bridal Hair",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (structure) =>
        structure
          .list()
          .title('Content')
          .items([
            structure
              .listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(structure.document().schemaType('siteSettings').documentId('siteSettings')),
            structure.divider(),
            ...structure.documentTypeListItems().filter((item) => item.getId() !== 'siteSettings'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
