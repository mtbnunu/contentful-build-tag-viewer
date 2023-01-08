import { SidebarExtensionSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import ImageTag from "../components/ImageTag";
import { Config, Image } from "../interface";

const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();

  sdk.window.startAutoResizer();

  const config: Config = {
    pollingInterval: 5000,
    images: [
      {
        url: "https://api.netlify.com/api/v1/badges/d383cdd6-bd16-49f3-a02a-b35347f3a83d/deploy-status",
        pollingInterval: 1000,
      },
      {
        url: "https://api.netlify.com/api/v1/badges/d383cdd6-bd16-49f3-a02a-b35347f3a83d/deploy-status",
        condition: {
          tag: "seongOne",
        },
      },
      {
        url: "https://api.netlify.com/api/v1/badges/d383cdd6-bd16-49f3-a02a-b35347f3a83d/deploy-status",
        condition: {
          id: "5NhVokDcwBEQZcnzEb5xQ0",
        },
      },
      {
        urlField: "siteId",
      },
    ],
  };

  const images = config.images.filter((image) => {
    if ("urlField" in image) {
      console.log("???");
      console.log(sdk.entry.fields[image.urlField]?.getValue());
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
          pollingInterval={image.pollingInterval ?? config.pollingInterval}
        />
      ))}
    </div>
  );
};

export default Sidebar;
