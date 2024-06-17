import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const makePdf = (): { viewWithPdf: () => Promise<File> } => {
  // Convert a single HTML element to an image
  const converToImg = async (element: HTMLElement): Promise<string> => {
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    return canvas.toDataURL('image/png', 1.0);
  };

  // Asynchronously convert all `.A4_paper` elements to a PDF
  const converToPdf = async (): Promise<File> => {
    const papers = document.querySelectorAll('.A4_paper');

    if (papers.length === 0) throw new Error('No A4 paper elements found.');

    const doc = new jsPDF('p', 'mm', 'a4', true);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 0; i < papers.length; i++) {
      const imageFile = await converToImg(papers[i] as HTMLElement);

      if (i > 0) {
        doc.addPage(); // Add a new page for each additional `.A4_paper` element
      }

      doc.addImage(
        imageFile,
        'JPEG',
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        'FAST',
      );
    }

    // Generate a blob URL for debugging
    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');

    // Create a PDF file blob to return
    const pdfBlob = doc.output('blob') as Blob; // Cast output to Blob
    const pdfFile = new File([pdfBlob], 'generatedDocument.pdf', {
      type: 'application/pdf',
    });

    return pdfFile;
  };

  return {
    viewWithPdf: async (): Promise<File> => {
      try {
        // Convert all `.A4_paper` elements to a single PDF file
        const pdfFile = await converToPdf();
        return pdfFile;
      } catch (error) {
        console.error('Error generating PDF: ', error);
        throw error; // Properly throw the error for upstream handling
      }
    },
  };
};
