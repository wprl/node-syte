DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)
MANAGERS = ADMINS

TIME_ZONE = 'America/Chicago'
LANGUAGE_CODE = 'en-us'
SITE_ID = 1
USE_I18N = False
USE_L10N = False
USE_TZ = True

MEDIA_ROOT = os.path.join(SITE_ROOT, 'static')

SECRET_KEY = '5c^pml#7e3d$zor%*_7y098(l0i=d3$+y_((11-_j0&amp;f9rw9%)'

ROOT_URLCONF = 'syte.urls'

