The **[Software Engineering Virtual Lab][0]** project is sponsored by the [Ministry of Human Resource Development][1], Government of India, and is part of the larger [Virtual Labs][2] project. This Lab is developed at [Indian Institute of Technology Kharagpur][3].

This repository contains the source code, content, and utility scripts for the **Software Engineering Virtual Lab**. The source code is released under GNU GPLv3 license and the content (except the Flash videos) is released under CC-BY-NC-SA-3.0 license.

The source code can be found inside the `src/codes` directory. The content is located inside the `src/content` directory.

The `scripts` directory has multiple shell scripts used for initialization of the system. The `Makefile` inside `src` directory is used for deploying the lab by copying source code and configuration files to appropriate locations. To install this Lab, download this repository from GitHub and execute `make`. Dependencies on third-party software are expected to be resolved automatically. However, the entire installation process would take up to an hour depending upon the network speed.

[0]: http://vlabs.iitkgp.ernet.in/se/
[1]: http://mhrd.gov.in/
[2]: http://vlab.co.in/
[3]: http://iitkgp.ac.in/
