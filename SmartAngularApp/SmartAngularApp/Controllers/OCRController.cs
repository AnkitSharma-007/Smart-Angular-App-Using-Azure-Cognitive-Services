using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Newtonsoft.Json;
using SmartAngularApp.DTOModels;
using SmartAngularApp.Models;
using System.Text;

namespace SmartAngularApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class OCRController : ControllerBase
    {
        static string subscriptionKey;
        static string endpoint;

        static OCRController()
        {
            subscriptionKey = "6a3337f3c5a6461dbb75fa4016f53abc";
            endpoint = "https://azureocrdemo.cognitiveservices.azure.com/";
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<OcrResultDTO> Post()
        {
            StringBuilder sb = new();
            OcrResultDTO ocrResultDTO = new();

            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[Request.Form.Files.Count - 1];

                    if (file.Length > 0)
                    {
                        OcrResult ocrResult = await ReadTextFromStream(file.OpenReadStream());

                        if (ocrResult.Regions.Count > 0)
                        {
                            foreach (OcrLine ocrLine in ocrResult.Regions[0].Lines)
                            {
                                foreach (OcrWord ocrWord in ocrLine.Words)
                                {
                                    sb.Append(ocrWord.Text);
                                    sb.Append(' ');
                                }
                                sb.AppendLine();
                            }
                        }
                        else
                        {
                            sb.Append("This language is not supported.");
                        }
                        ocrResultDTO.DetectedText = sb.ToString();
                        ocrResultDTO.Language = ocrResult.Language;
                    }
                }
                return ocrResultDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                ocrResultDTO.DetectedText = "Error occurred. Try again";
                ocrResultDTO.Language = "unk";
                return ocrResultDTO;
            }
        }

        static async Task<OcrResult> ReadTextFromStream(Stream imageData)
        {
            ComputerVisionClient client = Authenticate(endpoint, subscriptionKey);

            OcrResult result = await client.RecognizePrintedTextInStreamAsync(true, imageData);

            return result;
        }

        static ComputerVisionClient Authenticate(string endpoint, string key)
        {
            ComputerVisionClient client =
                new ComputerVisionClient(new ApiKeyServiceClientCredentials(key))
                { Endpoint = endpoint };

            return client;
        }

        [HttpGet]
        public async Task<List<AvailableLanguageDTO>> GetAvailableLanguages()
        {
            string endpoint = "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation";

            var client = new HttpClient();
            using var request = new HttpRequestMessage();
            request.Method = HttpMethod.Get;
            request.RequestUri = new Uri(endpoint);
            var response = await client.SendAsync(request).ConfigureAwait(false);
            string result = await response.Content.ReadAsStringAsync();

            AvailableLanguage deserializedOutput = JsonConvert.DeserializeObject<AvailableLanguage>(result);

            List<AvailableLanguageDTO> availableLanguage = new();

            if (deserializedOutput.Translation is not null)
            {
                foreach (KeyValuePair<string, LanguageDetails> translation in deserializedOutput.Translation)
                {
                    AvailableLanguageDTO language = new()
                    {
                        LanguageID = translation.Key,
                        LanguageName = translation.Value.Name
                    };

                    availableLanguage.Add(language);
                }
            }

            return availableLanguage;
        }
    }
}
