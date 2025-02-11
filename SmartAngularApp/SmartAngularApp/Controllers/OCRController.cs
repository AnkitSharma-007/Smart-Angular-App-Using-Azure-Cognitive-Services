using Azure;
using Azure.AI.Vision.ImageAnalysis;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace SmartAngularApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class OCRController : ControllerBase
    {
        readonly static string subscriptionKey;
        readonly static string endpoint;

        static OCRController()
        {
            subscriptionKey = "2w4RpDiShQEnKvTCUlKsqQca3aoyViDAWTJxLVugCCAYiduyRJIjJQQJ99BBACGhslBXJ3w3AAAFACOGeV8C";
            endpoint = "https://azureimageana.cognitiveservices.azure.com/";
        }

        [HttpPost, DisableRequestSizeLimit]
        public string Post()
        {
            StringBuilder sb = new();

            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[Request.Form.Files.Count - 1];

                    if (file.Length > 0)
                    {
                        ImageAnalysisResult ocrResult = ReadTextFromStream(file.OpenReadStream());

                        if (ocrResult.Read.Blocks.Count > 0)
                        {
                            foreach (DetectedTextBlock block in ocrResult.Read.Blocks)
                            {
                                foreach (DetectedTextLine line in block.Lines)
                                {
                                    sb.Append(line.Text);
                                    sb.AppendLine();
                                }
                            }
                        }
                        else
                        {
                            sb.Append("No Text Detected.");
                        }
                    }
                }
                return sb.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                sb.Append("Error occurred. Try again.");
                return sb.ToString();
            }
        }

        static ImageAnalysisResult ReadTextFromStream(Stream imageData)
        {
            ImageAnalysisClient client = Authenticate(endpoint, subscriptionKey);

            // Use the following code to analyze an image from a URL
            // ImageAnalysisResult result = client.Analyze(new Uri("https://aka.ms/azsdk/image-analysis/sample.jpg"), VisualFeatures.Read);

            ImageAnalysisResult result = client.Analyze(BinaryData.FromStream(imageData), VisualFeatures.Read);

            return result;
        }

        static ImageAnalysisClient Authenticate(string endpoint, string key)
        {
            ImageAnalysisClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
            return client;
        }
    }
}
