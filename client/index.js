import CollabClient from '@pdftron/collab-client';
import WebViewer from '@pdftron/webviewer';
import faker from 'faker';

const url = `http://localhost:3000`;
const subscriptionUrl = `ws://localhost:3000/subscribe`;
const viewerElement = document.getElementById('viewer');
const currentUser = faker.name.firstName();

const client = new CollabClient({
  url,
  subscriptionUrl,
});
const documentId = 'abcdefgh';

WebViewer(
  {
    path: '/public/webviewer',
  },
  viewerElement
).then(instance => {
  client.setInstance(instance);
  client.loginAnonymously(currentUser).then(() => {
    client.loadDocument(
      'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
      {
        documentId,
        filename: 'demo-annotated.pdf',
        isPublic: true,
      }
    );
  }).then((res) => {
    client.joinDocument(documentId);
  });
});
