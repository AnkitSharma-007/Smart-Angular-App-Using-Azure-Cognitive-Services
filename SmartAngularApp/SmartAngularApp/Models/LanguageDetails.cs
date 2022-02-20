namespace SmartAngularApp.Models
{
    public class LanguageDetails
    {
        public string Name { get; set; }
        public string NativeName { get; set; }
        public string Dir { get; set; }

        public LanguageDetails()
        {
            Name =  string.Empty;
            NativeName =  string.Empty;
            Dir =  string.Empty;
        }
    }
}
