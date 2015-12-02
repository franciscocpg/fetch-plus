/**
 * @copyright © 2015, Rick Wong. All rights reserved.
 */
import {compute} from "utils/compute";

// Export using middleware direct notation.
module.exports = (headerName, currentValue) => (request) => {
	if (currentValue) {
		request.options.headers[headerName] = compute(currentValue);
	}

	return {
		after: (response) => {
			if (response.headers.has(headerName)) {
				currentValue = response.headers.get(headerName);
			}

			return response;
		}
	};
};
