import logging
import os

LOG_DIR = os.path.join(os.path.dirname(__file__), '..', 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

logger = logging.getLogger('e2e')
logger.setLevel(logging.DEBUG)
_fmt = logging.Formatter('[%(asctime)s] [%(levelname)s] %(message)s')
_ch = logging.StreamHandler()
_ch.setFormatter(_fmt)
logger.addHandler(_ch)
_fh = logging.FileHandler(os.path.join(LOG_DIR, 'e2e.log'))
_fh.setFormatter(_fmt)
logger.addHandler(_fh)