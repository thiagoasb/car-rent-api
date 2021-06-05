import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";

container.registerSingleton<IMailProvider>(
    "EtherealMailProvider",
    "EtherealMailProvider"
);
