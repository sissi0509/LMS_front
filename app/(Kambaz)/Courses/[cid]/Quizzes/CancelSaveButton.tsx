import React from 'react'
import { Button } from 'react-bootstrap'

export default function CancelSaveButton() {
  return (
        <div className="mt-2 mb-3">
        <Button variant="danger" size="lg" className="me-1 text-nowrap">
            Save
        </Button>

        <Button variant="secondary" size="lg" className="me-1 text-nowrap">
            Cancel
        </Button>
    </div>
  )
}
