import * as React from 'react';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';
import { MathViewer } from '../mathViewer/MathViewer';

export function WorksheetPdf() {
  const list = [Contents2, Contents3, Contents4];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {list.map((card, i) => (
            <div key={i}>
              <Text>
                <MathViewer data={card} width="450px"></MathViewer>
              </Text>
            </div>
          ))}
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
