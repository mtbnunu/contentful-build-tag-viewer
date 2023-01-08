import { SidebarExtensionSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import ImageTag from "../components/ImageTag";
import { Config, Image } from "../interface";

const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();

  sdk.window.startAutoResizer();

const currentParameters: Config = sdk.parameters.installation as Config;

const images = currentParameters.images.filter((image) => {
  if ("urlField" in image) {
    if (!sdk.entry.fields[image.urlField]?.getValue()) {
      return false;
    }
  }

  if (!image.condition) {
    return true;
  }
  if (image.condition.tag) {
    return sdk.entry
      .getMetadata()
      ?.tags.find((tag) => tag.sys.id === image.condition?.tag);
  }
  if (image.condition.id) {
    return sdk.entry.getSys().id === image.condition.id;
  }
  return false;
});

const getImageUrl = (image: Image) => {
  if ("url" in image) {
    return image.url;
  }
  if ("urlField" in image) {
    return sdk.entry.fields[image.urlField].getValue();
  }
};

return (
  <div>
    {images.map((image, i) => (
      <ImageTag
        key={i}
        imageUrl={getImageUrl(image)}
        pollingInterval={
          image.pollingInterval ?? currentParameters.pollingInterval
        }
      />
    ))}
  </div>
);
};

export default Sidebar;
