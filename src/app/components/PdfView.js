
export default function PdfView({pdfPath, width, height}) {
    return (
        <object style={{width:width,height:height }} data={pdfPath} type="application/pdf" ></object>
    )    
}