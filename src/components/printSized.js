import React from 'react';

const printSizes = [
  { size: '12x12', resolution: '341 PPI', quality: 'Canvas print', description: 'Amazing' },
  { size: '16x16', resolution: '256 PPI', quality: 'Canvas print', description: 'Great' },
  { size: '20x20', resolution: '204 PPI', quality: 'Canvas print', description: 'Excellent' },
  { size: '24x24', resolution: '170 PPI', quality: 'Canvas print', description: 'Superb' },
  { size: '28x28', resolution: '146 PPI', quality: 'Canvas print', description: 'Awesome' },
  { size: '32x32', resolution: '128 PPI', quality: 'Canvas print', description: 'Fantastic' },
  { size: '48x48', resolution: '85 PPI', quality: 'Canvas print', description: 'Impressive' },
  // Add more print sizes as needed
];

const PrintSizes = () => {
  return (
    <div className="grid-container">
      <h1>Image Print Sizes and Qualities</h1>
      <div className="grid">
        {printSizes.map(({ size, resolution, quality }, index) => (
          <div className="grid-item" key={index}>
            <h2>{size}</h2>
            <p><strong>Resolution:</strong> {resolution}</p>
            <p><strong>Quality:</strong> {quality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintSizes;
