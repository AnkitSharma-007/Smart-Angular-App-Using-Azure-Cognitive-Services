namespace SmartAngularApp.DTOModels
{
    public class OcrResultDTO
    {
        public string Language { get; set; }
        public string DetectedText { get; set; }

        public OcrResultDTO()
        {
            Language = string.Empty;
            DetectedText = string.Empty;
        }
    }
}
