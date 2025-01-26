import { resetServer, stopServer } from "./integration/serverUtils";
import { refreshGlobalMock } from "./mock";

afterAll(stopServer);

refreshGlobalMock();
beforeEach(refreshGlobalMock);

afterEach(resetServer);
