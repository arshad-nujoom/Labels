import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { LabelData } from '../types';

// Define font sizes based on user selection
const fontSizes = {
  normal: {
    title: 11,
    subtitle: 9,
    body: 8,
    small: 7,
  },
  small: {
    title: 10,
    subtitle: 8,
    body: 7,
    small: 6,
  },
  smallest: {
    title: 9,
    subtitle: 7,
    body: 6,
    small: 5,
  }
};

// Register fonts if needed
// Font.register({
//   family: 'Open Sans',
//   fonts: [
//     { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
//     { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
//   ]
// });

interface LabelDocumentProps {
  labelData: LabelData;
}

const LabelDocument: React.FC<LabelDocumentProps> = ({ labelData }) => {
  // A4 paper dimensions in points (595.28 x 841.89)
  // Margins: top/bottom 1.2cm ≈ 34 points, left/right 0.6cm ≈ 17 points
  // Gap between columns: 0.3cm ≈ 8.5 points
  
  // Create 16 labels (2x8 grid)
  const labels = Array(16).fill(null);
  
  // Format due date
  const formattedDate = labelData.dueDate ? 
    format(new Date(labelData.dueDate), 'yyyy-MM-dd') : '';
  
  // Selected font size
  const fontSize = fontSizes[labelData.fontSize];
  
  // Create dynamic styles based on font size
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      padding: '34pt 17pt',
    },
    column: {
      flex: 1,
      flexDirection: 'column',
      marginHorizontal: '4.25pt',
    },
    label: {
      border: '1pt dotted #000000',
      marginBottom: '0pt',
      padding: '8pt',
      height: '96.25pt', // (841.89 - 34*2) / 8 - space for borders
      position: 'relative',
    },
    productNameRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4pt',
    },
    productName: {
      fontSize: fontSize.title,
      fontWeight: 'bold',
    },
    dueDate: {
      fontSize: fontSize.small,
    },
    description: {
      fontSize: fontSize.body,
      marginBottom: '2pt',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '2pt',
    },
    labelHeading: {
      fontSize: fontSize.subtitle,
      fontWeight: 'bold',
    },
    labelText: {
      fontSize: fontSize.body,
    },
    price: {
      fontSize: fontSize.body,
      fontWeight: 'bold',
    },
    allergens: {
      fontSize: fontSize.body,
      fontWeight: 'bold',
      color: '#d00000',
    },
    instructions: {
      fontSize: fontSize.small,
      marginTop: '2pt',
    },
    veganBadge: {
      position: 'absolute',
      bottom: '8pt',
      right: '8pt',
      width: '20pt',
      height: '20pt',
      borderRadius: '10pt',
      backgroundColor: '#2F855A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    veganText: {
      color: 'white',
      fontSize: fontSize.small,
      fontWeight: 'bold',
    },
  });

  // Split the labels into two columns
  const leftColumnLabels = labels.slice(0, 8);
  const rightColumnLabels = labels.slice(8, 16);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftColumnLabels.map((_, index) => (
            <View key={`left-${index}`} style={styles.label}>
              <View style={styles.productNameRow}>
                <Text style={styles.productName}>{labelData.productName}</Text>
                {formattedDate && (
                  <Text style={styles.dueDate}>Best before: {formattedDate}</Text>
                )}
              </View>
              
              {labelData.description && (
                <Text style={styles.description}>{labelData.description}</Text>
              )}
              
              <View style={styles.row}>
                <View>
                  <Text style={styles.labelHeading}>Ingredients:</Text>
                  <Text style={styles.labelText}>{labelData.ingredients}</Text>
                </View>
                
                <Text style={styles.price}>{labelData.price} kr</Text>
              </View>
              
              {labelData.allergens && (
                <View>
                  <Text style={styles.labelHeading}>Allergens:</Text>
                  <Text style={styles.allergens}>{labelData.allergens}</Text>
                </View>
              )}
              
              <View>
                <Text style={styles.labelHeading}>Instructions:</Text>
                <Text style={styles.instructions}>{labelData.instructions}</Text>
              </View>
              
              {labelData.isVegan && (
                <View style={styles.veganBadge}>
                  <Text style={styles.veganText}>V</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Right Column */}
        <View style={styles.column}>
          {rightColumnLabels.map((_, index) => (
            <View key={`right-${index}`} style={styles.label}>
              <View style={styles.productNameRow}>
                <Text style={styles.productName}>{labelData.productName}</Text>
                {formattedDate && (
                  <Text style={styles.dueDate}>Best before: {formattedDate}</Text>
                )}
              </View>
              
              {labelData.description && (
                <Text style={styles.description}>{labelData.description}</Text>
              )}
              
              <View style={styles.row}>
                <View>
                  <Text style={styles.labelHeading}>Ingredients:</Text>
                  <Text style={styles.labelText}>{labelData.ingredients}</Text>
                </View>
                
                <Text style={styles.price}>{labelData.price} kr</Text>
              </View>
              
              {labelData.allergens && (
                <View>
                  <Text style={styles.labelHeading}>Allergens:</Text>
                  <Text style={styles.allergens}>{labelData.allergens}</Text>
                </View>
              )}
              
              <View>
                <Text style={styles.labelHeading}>Instructions:</Text>
                <Text style={styles.instructions}>{labelData.instructions}</Text>
              </View>
              
              {labelData.isVegan && (
                <View style={styles.veganBadge}>
                  <Text style={styles.veganText}>V</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default LabelDocument;