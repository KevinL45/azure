import time
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
import os

# import load_secrets
import time

try:
    import azure.ai.vision as visionsdk
except ImportError:
    print("""
    Importing Azure AI Vision SDK for Python failed.
    Refer to README.md in this directory for installation instructions.
    """)
    import sys
    sys.exit(1)


"""
This sample does analysis on an image file using all visual features
and a synchronous (blocking) call. It prints the results to the console,
including the detailed results.
"""
class ComputerVision:
    def __init__(self):
        subscription_key = os.environ["VISION_KEY"]
        endpoint = os.environ["VISION_ENDPOINT"]
        self.computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    def analyze_picture(self, url):


        # url = https://pomonastorage.blob.core.windows.net/pictures/Cheesecake.jpg
        result_tags = []
        subscription_key = os.environ["VISION_KEY"]
        endpoint = os.environ["VISION_ENDPOINT"]
        service_options = visionsdk.VisionServiceOptions(endpoint, subscription_key)

        # Specify the image file on disk to analyze. sample.jpg is a good example to show most features
        # vision_source = visionsdk.VisionSource(filename="sample.jpg")
        read_image_url = "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/bltef565a6da4bc399a/649c474f1cec001670d8938b/MxBo_BIGMAC.png?auto=webp&width=1280&disable=upscale%201x"
        # vision_source = visionsdk.VisionSource(url="https://media.istockphoto.com/id/675804830/photo/beige-hamster.jpg?s=612x612&w=0&k=20&c=e4P9Z3U3PVwtNEMZUCkoDkBrHr9E0XDxk9fZdDKZHZ4=")
        # vision_source = visionsdk.VisionSource(url="https://www.imie-paris.fr/embauchez-moi/Image/Serge_fond.png")
        vision_source = visionsdk.VisionSource(url=url)

        # Or, instead of the above, specify a publicly accessible image URL to analyze. For example:
        # image_url = "https://aka.ms/azai/vision/image-analysis-sample.jpg"
        # vision_source = visionsdk.VisionSource(url=image_url)

        # Set the language and one or more visual features as analysis options
        analysis_options = visionsdk.ImageAnalysisOptions()

        # Mandatory. You must set one or more features to analyze. Here we use the full set of features.
        # Note that "CAPTION" and "DENSE_CAPTIONS" are only supported in Azure GPU regions (East US, France Central,
        # Korea Central, North Europe, Southeast Asia, West Europe, West US). Remove "CAPTION" and "DENSE_CAPTIONS"
        # from the list below if your Computer Vision key is not from one of those regions.
        analysis_options.features = (
            # visionsdk.ImageAnalysisFeature.CROP_SUGGESTIONS |
            # visionsdk.ImageAnalysisFeature.CAPTION |
            # visionsdk.ImageAnalysisFeature.DENSE_CAPTIONS |
            # visionsdk.ImageAnalysisFeature.OBJECTS |
            # visionsdk.ImageAnalysisFeature.PEOPLE |
            visionsdk.ImageAnalysisFeature.TEXT |
            visionsdk.ImageAnalysisFeature.TAGS
        )

        analysis_options.language = 'fr'

        # Optional, and only relevant when you select ImageAnalysisFeature.CROP_SUGGESTIONS.
        # Define one or more aspect ratios for the desired cropping. Each aspect ratio needs
        # to be in the range [0.75, 1.8]. If you do not set this, the service will return one
        # crop suggestion with the aspect ratio it sees fit.
        analysis_options.cropping_aspect_ratios = [0.9, 1.33]

        # Optional. Default is "en" for English. See https://aka.ms/cv-languages for a list of supported
        # language codes and which visual features are supported for each language.

        # Optional. Default is "latest".
        analysis_options.model_version = "latest"

        # Optional, and only relevant when you select ImageAnalysisFeature.CAPTION.
        # Set this to "true" to get a gender neutral caption (the default is "false").
        analysis_options.gender_neutral_caption = True

        # Create the image analyzer object
        image_analyzer = visionsdk.ImageAnalyzer(service_options, vision_source, analysis_options)

        # Do image analysis for the specified visual features
        print()
        print(" Please wait for image analysis results...")
        print()

        # This call creates the network connection and blocks until Image Analysis results
        # return (or an error occurred). Note that there is also an asynchronous (non-blocking)
        # version of this method: image_analyzer.analyze_async().
        result = image_analyzer.analyze()

        # Checks result.
        if result.reason == visionsdk.ImageAnalysisResultReason.ANALYZED:

            print(" Image height: {}".format(result.image_height))
            print(" Image width: {}".format(result.image_width))
            print(" Model version: {}".format(result.model_version))

            # if result.caption is not None:
            #     print(" Caption:")
            #     print("   '{}', Confidence {:.4f}".format(result.caption.content, result.caption.confidence))

            # if result.dense_captions is not None:
            #     print(" Dense Captions:")
            #     for caption in result.dense_captions:
            #         print("   '{}', {}, Confidence: {:.4f}".format(caption.content, caption.bounding_box, caption.confidence))

            # if result.objects is not None:
            #     print(" Objects:")
            #     for object in result.objects:
            #         print("   '{}', {}, Confidence: {:.4f}".format(object.name, object.bounding_box, object.confidence))

            if result.tags is not None:
                print(" Tags:")
                for tag in result.tags:
                    result_tags.append({"name":tag.name, "confidence": tag.confidence})
                    print("   '{}', Confidence {:.4f}".format(tag.name, tag.confidence))

            # if result.people is not None:
            #     print(" People:")
            #     for person in result.people:
            #         print("   {}, Confidence {:.4f}".format(person.bounding_box, person.confidence))

            # if result.crop_suggestions is not None:
            #     print(" Crop Suggestions:")
            #     for crop_suggestion in result.crop_suggestions:
            #         print("   Aspect ratio {}: Crop suggestion {}"
            #             .format(crop_suggestion.aspect_ratio, crop_suggestion.bounding_box))

            if result.text is not None:
                print(" Text:")
                for line in result.text.lines:
                    points_string = "{" + ", ".join([str(int(point)) for point in line.bounding_polygon]) + "}"
                    print("   Line: '{}', Bounding polygon {}".format(line.content, points_string))
                    for word in line.words:
                        points_string = "{" + ", ".join([str(int(point)) for point in word.bounding_polygon]) + "}"
                        print("     Word: '{}', Bounding polygon {}, Confidence {:.4f}"
                            .format(word.content, points_string, word.confidence))

            result_details = visionsdk.ImageAnalysisResultDetails.from_result(result)
            print(" Result details:")
            print("   Image ID: {}".format(result_details.image_id))
            print("   Result ID: {}".format(result_details.result_id))
            print("   Connection URL: {}".format(result_details.connection_url))
            print("   JSON result: {}".format(result_details.json_result))

        else:

            error_details = visionsdk.ImageAnalysisErrorDetails.from_result(result)
            print(" Analysis failed.")
            print("   Error reason: {}".format(error_details.reason))
            print("   Error code: {}".format(error_details.error_code))
            print("   Error message: {}".format(error_details.message))
            print(" Did you set the computer vision endpoint and key?")

        return result_tags



        # Get an image with text
        # result = []
        # read_image_url = "https://media.istockphoto.com/id/675804830/photo/beige-hamster.jpg?s=612x612&w=0&k=20&c=e4P9Z3U3PVwtNEMZUCkoDkBrHr9E0XDxk9fZdDKZHZ4="
        # # read_image_url = "https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/bltef565a6da4bc399a/649c474f1cec001670d8938b/MxBo_BIGMAC.png?auto=webp&width=1280&disable=upscale%201x"

        # # Call API with URL and raw response (allows you to get the operation location)
        # read_response = self.computervision_client.read(read_image_url,  raw=True)

        # # Get the operation location (URL with an ID at the end) from the response
        # read_operation_location = read_response.headers["Operation-Location"]
        # # # Grab the ID from the URL
        # operation_id = read_operation_location.split("/")[-1]

        # # # Call the "GET" API and wait for it to retrieve the results 
        # while True:
        #     read_result = self.computervision_client.get_read_result(operation_id)
        #     if read_result.status not in ['notStarted', 'running']:
        #         break
        #     time.sleep(1)

        # # Print the detected text, line by line
        # if read_result.status == OperationStatusCodes.succeeded:
        #     for text_result in read_result.analyze_result.read_results:
        #         for line in text_result.lines:
        #             result.append(line.text)
        #             print(line.text)
        #             print(line.bounding_box)
        # print()
        # return result
        # image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)

# result = image_analyzer.analyze()

# if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:

#     print(" Image height: {}".format(result.image_height))
#     print(" Image width: {}".format(result.image_width))
#     print(" Model version: {}".format(result.model_version))

#     if result.caption is not None:
#         print(" Caption:")
#         print("   '{}', Confidence {:.4f}".format(result.caption.content, result.caption.confidence))

#     if result.dense_captions is not None:
#         print(" Dense Captions:")
#         for caption in result.dense_captions:
#             print("   '{}', {}, Confidence: {:.4f}".format(caption.content, caption.bounding_box, caption.confidence))

#     if result.objects is not None:
#         print(" Objects:")
#         for object in result.objects:
#             print("   '{}', {}, Confidence: {:.4f}".format(object.name, object.bounding_box, object.confidence))

#     if result.tags is not None:
#         print(" Tags:")
#         for tag in result.tags:
#             print("   '{}', Confidence {:.4f}".format(tag.name, tag.confidence))

#     if result.people is not None:
#         print(" People:")
#         for person in result.people:
#             print("   {}, Confidence {:.4f}".format(person.bounding_box, person.confidence))

#     if result.crop_suggestions is not None:
#         print(" Crop Suggestions:")
#         for crop_suggestion in result.crop_suggestions:
#             print("   Aspect ratio {}: Crop suggestion {}"
#                   .format(crop_suggestion.aspect_ratio, crop_suggestion.bounding_box))

#     if result.text is not None:
#         print(" Text:")
#         for line in result.text.lines:
#             points_string = "{" + ", ".join([str(int(point)) for point in line.bounding_polygon]) + "}"
#             print("   Line: '{}', Bounding polygon {}".format(line.content, points_string))
#             for word in line.words:
#                 points_string = "{" + ", ".join([str(int(point)) for point in word.bounding_polygon]) + "}"
#                 print("     Word: '{}', Bounding polygon {}, Confidence {:.4f}"
#                       .format(word.content, points_string, word.confidence))

#     result_details = sdk.ImageAnalysisResultDetails.from_result(result)
#     print(" Result details:")
#     print("   Image ID: {}".format(result_details.image_id))
#     print("   Result ID: {}".format(result_details.result_id))
#     print("   Connection URL: {}".format(result_details.connection_url))
#     print("   JSON result: {}".format(result_details.json_result))

# else:

#     error_details = sdk.ImageAnalysisErrorDetails.from_result(result)
#     print(" Analysis failed.")
#     print("   Error reason: {}".format(error_details.reason))
#     print("   Error code: {}".format(error_details.error_code))
#     print("   Error message: {}".format(error_details.message))