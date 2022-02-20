namespace SmartAngularApp.DTOModels
{
    public class AvailableLanguageDTO
    {
        public string LanguageID { get; set; }
        public string LanguageName { get; set; }

        public AvailableLanguageDTO()
        {
            LanguageID = string.Empty;
            LanguageName = string.Empty;
        }
    }
}
