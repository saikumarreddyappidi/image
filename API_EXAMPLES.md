# API Examples - cURL Commands

## Authentication Endpoints

### Get Current User
```bash
curl http://localhost:5000/auth/current-user \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X GET
```

### Logout
```bash
curl http://localhost:5000/auth/logout \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X GET
```

## Search & History Endpoints

### Search for Images
```bash
# Basic search
curl http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X POST \
  -d '{"term": "nature"}'

# Search with pagination
curl http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X POST \
  -d '{"term": "technology", "page": 2, "perPage": 20}'
```

### Get Top Searches
```bash
curl http://localhost:5000/api/top-searches \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X GET
```

### Get Search History
```bash
# Get default history (50 items)
curl http://localhost:5000/api/history \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X GET

# Get limited history
curl "http://localhost:5000/api/history?limit=20" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X GET
```

### Clear Search History
```bash
curl http://localhost:5000/api/history \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -X DELETE
```

## PowerShell Examples (Windows)

### Search for Images (PowerShell)
```powershell
$body = @{
    term = "nature"
    page = 1
    perPage = 20
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/search" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body `
  -WebSession $session
```

### Get Top Searches (PowerShell)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/top-searches" `
  -Method Get `
  -WebSession $session
```

### Get Search History (PowerShell)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/history?limit=20" `
  -Method Get `
  -WebSession $session
```

## Response Examples

### Search Response
```json
{
  "searchTerm": "nature",
  "total": 10000,
  "totalPages": 500,
  "results": [
    {
      "id": "abc123",
      "description": "Beautiful mountain landscape",
      "urls": {
        "raw": "https://...",
        "full": "https://...",
        "regular": "https://...",
        "small": "https://...",
        "thumb": "https://..."
      },
      "links": {
        "html": "https://unsplash.com/photos/abc123",
        "download": "https://..."
      },
      "user": {
        "name": "John Doe",
        "username": "johndoe",
        "profileImage": "https://..."
      },
      "width": 4000,
      "height": 3000,
      "color": "#2c3e50",
      "likes": 150
    }
  ]
}
```

### Top Searches Response
```json
[
  {
    "term": "nature",
    "count": 45,
    "lastSearched": "2025-10-29T10:30:00.000Z"
  },
  {
    "term": "technology",
    "count": 32,
    "lastSearched": "2025-10-29T09:15:00.000Z"
  }
]
```

### Search History Response
```json
[
  {
    "term": "nature",
    "timestamp": "2025-10-29T10:30:00.000Z"
  },
  {
    "term": "food",
    "timestamp": "2025-10-29T09:20:00.000Z"
  }
]
```

### Current User Response
```json
{
  "authenticated": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "displayName": "John Doe",
    "email": "john@example.com",
    "profilePhoto": "https://...",
    "provider": "google"
  }
}
```

## Testing with Postman

1. Import the `postman_collection.json` file into Postman
2. Login via browser first (http://localhost:3000)
3. Copy the `connect.sid` cookie from browser DevTools
4. Add cookie to Postman requests or use Postman Interceptor
5. Send requests

## Testing OAuth Flow

Since OAuth requires browser interaction, you cannot test it with cURL directly. Instead:

1. Open browser to: `http://localhost:5000/auth/google`
2. Complete OAuth flow
3. Session cookie will be set automatically
4. Use browser DevTools to copy cookie for API testing

## Notes

- All API endpoints (except auth) require authentication
- Session cookie (`connect.sid`) must be included in requests
- Search terms are automatically converted to lowercase and trimmed
- Default pagination: page=1, perPage=20
- Unsplash demo API has rate limit of 50 requests/hour
